import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import db, { collection, getDocs, query, where, addDoc, onSnapshot } from '../firebase'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'

function Headache() {
    const [products, setProducts] = useState([])
    const [subscription, setSubscription] = useState(null)
    const user = useSelector(selectUser)
    const queryProducts = query(collection(db, "products"), where("active", "==", true))

    const loadCheckout = async (priceID) => {
        let checkoutSessionData = {
            price: priceID,
            success_url: window.location.origin,
            cancel_url: window.location.origin
        };

        const checkoutSessionRef = await addDoc(collection(db, `customers/${user.uid}/checkout_sessions`),
            checkoutSessionData)

        onSnapshot(checkoutSessionRef, (snap) => {
            const { error, url } = snap.data();
            if (error) {
                // Show an error to the customer
                alert(`An error occured: ${error.message}`)
            }
            if (url) {
                // Redirect to checkout
                window.location.assign(url);
            }
        })
    }

    useEffect(() => {
        getDocs(collection(db, `customers/${user.uid}/subscriptions`)).then((querySnapshot) => {
            querySnapshot.forEach(async (subscription) => {
                setSubscription({
                    role: subscription.data().role,
                    current_period_start: subscription.data().current_period_start.seconds,
                    current_period_end: subscription.data().current_period_end.seconds,
                })
            })
        })
    }, [user.uid])

    useEffect(() => {
        getDocs(queryProducts).then((querySnapshot) => {
            const products = {};
            querySnapshot.forEach(async (productDoc) => {
                products[productDoc.id] = productDoc.data();

                const priceSnap = await getDocs(collection(db, "products", productDoc.id, "prices",));
                priceSnap.docs.forEach((price) => {
                    products[productDoc.id].prices = {
                        priceID: price.id,
                        priceData: price.data()
                    }
                })
            });
            setProducts(products)
        })
    }, [])

    return (
        < Container >
            {subscription && (<p>Renewal Date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>)}
            {Object.entries(products).map(([productID, productData]) => {
                const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role)

                return (
                    <PlansContainer key={productID}>
                        <PlansInfo>
                            <h4>{productData.name}</h4>
                            <h5>{productData.description}</h5>
                        </PlansInfo>
                        <SubsribeButton package={isCurrentPackage} onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceID)}>
                            {isCurrentPackage ? "Current Package" : "Subscribe"}
                        </SubsribeButton>
                    </PlansContainer>
                )
            })}
        </Container>
    )
}

export default Headache

const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;

    p{
        padding-top: 10px;
    }
`

const PlansContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    opacity: 0.8;

    &:hover{
        opacity: 1;
    }
`

const PlansInfo = styled.div``

const SubsribeButton = styled.button`
    padding: 10px 20px;
    max-height: 40px;
    border: none;
    border-radius: 5px;
    background-color: ${prop => prop.package ? "rgb(100,100,100)" : "#E50914"};
    font-size: 16px;
    font-weight: 600;
    color: white;
    cursor: pointer;
`