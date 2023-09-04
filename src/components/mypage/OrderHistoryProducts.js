import React, { useEffect, useState } from 'react';
import { formatDateTime } from '../common/DateUtils';
import { Link } from 'react-router-dom';

const OrderHistoryProducts = ({ orders }) => {
    const [productDetails, setProductDetails] = useState([]);
    const [numberOfProducts, setNumberOfProducts] = useState([]);
    const [orderState, setOrderState] = useState();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const details = await Promise.all(
                    sortedOrders.map(async (order) => {
                        const response = await fetch(`/order-products/order/${order.orderId}`);
                        const data = await response.json();
                        const productIds = data.map(item => item.productId);
                        setNumberOfProducts(prevNumberOfProducts => [...prevNumberOfProducts, productIds.length]);

                        if (productIds.length > 0) {
                            const productResponse = await fetch(`/shopping/products/${productIds[0]}`);
                            const productData = await productResponse.json();
                            return productData;
                        }

                        return null;
                    })
                );

                setProductDetails(details);
            } catch (error) {
                console.error('상품 정보를 가져오는 중 오류가 발생했습니다.', error);
            }
        };

        const sortedOrders = orders.slice().sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
        fetchProductDetails();
    }, [orders]);

    // 주문을 orderDate를 기준으로 역순으로 정렬
    const sortedOrders = orders.slice().sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

    const handleConfirmPurchase = async (orderId) => {
        try {
            const response = await fetch(`/orders/${orderId}/status/5`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                console.error('주문 상태 업데이트 성공');
                window.location.reload();
                
            } else {
                console.error('주문 상태 업데이트 실패');
            }
            
        } catch (error) {
            console.error('주문 상태 업데이트 중 오류 발생', error);
        }
    };


    return (
        <div>
            {sortedOrders.length > 0 ? (
                sortedOrders.map((order, index) => (
                    <div style={{ margin: '10px 0' }} key={order.orderId}>
                        <div>주문날짜: {formatDateTime(order.orderDate)}</div>
                        {productDetails[index] ? (
                            <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                <div style={{ flex: '3', textAlign: 'left' }}>
                                    <Link to={`/orderhistory/${order.orderId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <img src={productDetails[index].thumbnailUrl} alt="상품 이미지" style={{ width: '180px', height: '180px' }} />
                                    </Link>
                                </div>
                                <div style={{ flex: '6', textAlign: 'left' }}>
                                    <Link to={`/orderhistory/${order.orderId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        {numberOfProducts[index] === 1 ? (
                                            <>
                                                {productDetails[index].productName}
                                            </>
                                        ) : (
                                            <>
                                                {productDetails[index].productName} 외 {numberOfProducts[index] - 1}건
                                            </>
                                        )}
                                    </Link>
                                </div>
                                <div style={{ flex: '2' }}>{order.totalPrice.toLocaleString()} 원</div>
                                <div style={{ flex: '1' }}>
                                    <div>상태<br />{order.orderStatus}</div>
                                    {order.orderStatus == 1 ? (
                                        <button onClick={() => handleConfirmPurchase(order.orderId)}>구매확정</button>
                                    ) : (
                                        <button disabled>구매확정</button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            '로딩 중...'
                        )}
                    </div>
                ))
            ) : (
                <p>주문 내역이 없습니다.</p>
            )}
        </div>
    );
};

export default OrderHistoryProducts;