function handleAddToCart(code) {
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ code, quantity: 1 }),
  };
  fetch("http://localhost:3000/cart", options)
    .then((response) => {
      if (!response.ok) {
        // Error
      }
      console.log("Product added into cart");
    })
    .finally(() => {});
}

function handleSearchClick(event) {
  if(event.key === 'Enter') {
      window.location.href = `/search?key=${event.target.value}`;
  }
}
