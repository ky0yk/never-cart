import { Cart, Product, ProductId, toCart } from './domain';
import { Result, ok, err } from 'neverthrow';

const addToCart = (cart: Cart, productId: ProductId): Result<Cart, Error> => {
    return findProductById(productId).andThen((product) => {
        const updatedItems = [...cart.items, product];
        const updatedTotalPrice = calcTotalPrice(updatedItems);

        return ok(
            toCart({ items: updatedItems, totalPrice: updatedTotalPrice })
        );
    });
};

const calcTotalPrice = (items: Product[]): number => {
    return items.reduce((total, item) => total + item.price, 0);
};

const findProductById = (id: ProductId): Result<Product, Error> => {
    // TODO プロダクトIDから引き当てする処理に変更
    const product = {
        id: '',
        name: '',
        price: 10,
    };

    return ok(product);
};

const removeFromCart = (cart: Cart, productId: string): Result<Cart, Error> => {
    const updatedItems = cart.items.filter((item) => item.id !== productId);

    if (updatedItems.length === cart.items.length) {
        return err(Error('Product not found in cart'));
    }

    return ok({ ...cart, items: updatedItems });
};

const getNewCart = (cart?: Cart): Cart => {
    // TODO 元のカートを破棄する

    // 新しい空のカートを返す
    return toCart({
        items: [],
        totalPrice: 0,
    });
};

// TODO CheckOutedCartを使って注文履歴を出す

const checkout = (cart: Cart): Result<Cart, Error> => {
    return checkInventory(cart)
        .andThen((checkedCart) => processPayment(checkedCart))
        .andThen((paidCart) => confirmOrder(paidCart))
        .map((confirmedCart) => getNewCart(confirmedCart))
        .mapErr((error) => {
            console.error(`Error: ${error}`);
            return error;
        });
};

const checkInventory = (cart: Cart): Result<Cart, Error> => {
    // すべての商品が在庫にあると仮定
    return ok(cart);
};

class InvalidPaymentError extends Error {}

const processPayment = (cart: Cart): Result<Cart, InvalidPaymentError> => {
    return cart.totalPrice > 0
        ? ok(cart)
        : err(new InvalidPaymentError('Invalid payment amount'));

    // TODO  支払い処理のシミュレーションを追加
};

const confirmOrder = (cart: Cart): Result<Cart, never> => {
    // TODO DBへの書き込み
    // TODO CheckoutedCartを返す
    return ok(cart);
};
