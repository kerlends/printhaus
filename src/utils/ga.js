const ga = (...args) => {
  if (!window.ga) {
    return setTimeout(() => {
      ga(...args);
    }, 1000);
  }

  window.ga(...args);
};

export const report = ({
  category: eventCategory,
  action: eventAction,
  label: eventLabel,
}) =>
  ga('send', {
    hitType: 'event',
    eventCategory,
    eventAction,
    eventLabel,
  });

export const reportCartEvent = (action, label) =>
  report({
    category: 'Shopping Cart',
    action,
    label,
  });

export const productAddedToCart = (productName) =>
  reportCartEvent('Product added to cart', productName);

export const productRemovedFromCart = (productName) =>
  reportCartEvent('Product removed from cart', productName);
