import React,{useState} from 'react';
import CartShoppingCard from "../../components/CartShoppingCard/CartShoppingCard";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import Modal from "../../components/Modal/Modal";
import RandomContent from "../../components/Modal/ModalContents/RandomContent";

const Cart: React.FC = () => {
    const products = useSelector((state: RootState) => state.products);
    const [showModal, setShowModal] = useState(false);

    // Calculate the total number of selected products
    const totalItems = products.reduce((total, product) => total + product.quantity, 0);

    // Calculate the total price of selected products (price * quantity)
    const totalPrice = products.reduce((total, product) => total + (product.price * product.quantity), 0);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setShowModal(false);
    };

    if (products.length === 0) {
        return (
            <div className="grid place-items-center text-purple-700 font-semibold">
                سبد خرید شما در حال حاضر خالی است!
            </div>
        )
    }

    return (
        <div className="flex flex-col justify-between min-h-[calc(75vh-4rem)]">
            {/* Product list */}
            <div className="grow">
                {products.map((product, index) => (
                    <div key={index} className="mb-5">
                        <CartShoppingCard productData={product} />
                    </div>
                ))}
            </div>

            {/* Footer with total items and price */}
            <div className="flex justify-between items-center p-4 bg-gray-50 shadow-lg mt-4">
                <div className="flex flex-col gap-2">
                    <p className="text-md text-fuchsia-500 font-semibold">
                        تکمیل و ادامه فرآیند پرداخت {totalItems} کالا از {products.length} محصول انتخاب شده
                    </p>
                    <p className="text-lg text-purple-700 font-semibold">
                        مبلغ پرداخت سفارش {totalPrice.toLocaleString()} تومان
                    </p>
                </div>
                <button
                    onClick={handleOpenModal}
                    className="flex items-center gap-5 px-3.5 py-2.5 bg-purple-700 text-white rounded text-sm"
                >
                    تکمیل و پرداخت
                    <img src={"/icons/WalletIcon.svg"} alt="wallet icon" className="h-8 w-8" />
                </button>
            </div>
            {/* Show Modal if state is true */}
            {showModal && (
                <Modal title="وضعیت پرداخت" width={504} onClose={handleCloseModal} isOpen={showModal}>
                    <RandomContent onClose={handleCloseModal}/>
                </Modal>
            )}
        </div>
    );
};

export default Cart;
