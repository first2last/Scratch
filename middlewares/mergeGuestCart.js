module.exports = async (req, res, next) => {
    if (req.user && req.session.guestCart?.length > 0) {
        try {
            const user = await userModel.findOne({ email: req.user.email });
            
            // Merge guest cart with user cart
            const uniqueItems = [...new Set([
                ...user.cart.map(id => id.toString()),
                ...req.session.guestCart
            ])];
            
            user.cart = uniqueItems;
            await user.save();
            
            // Clear guest cart
            req.session.guestCart = [];
            console.log('Merged guest cart with user account');
        } catch (err) {
            console.error('Cart merge error:', err);
        }
    }
    next();
};