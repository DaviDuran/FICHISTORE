const Container = document.querySelector('#cart');
const template = document.querySelector('#template');
const template_total_purchase = document.querySelector('#template_total_purchase');
const template_total = document.querySelector('#template_total');
const fragment = document.createDocumentFragment()
const gameButtons = document.querySelectorAll('.buy');

let shoppingCartProducts = [];
const limiteDeCompra = 3;


const addtoCart = (e) => {
    const product = {
        title : e.target.dataset.juego,
        id: e.target.dataset.juego,
        quantity: 1,
        cost: parseInt(e.target.dataset.price,)
    };

    const position = shoppingCartProducts.findIndex((item) =>{
        return item.title === product.title;
    });

    if(position === -1) {
        shoppingCartProducts.push(product);
    } else if (shoppingCartProducts[position].quantity < limiteDeCompra) {
        shoppingCartProducts[position].quantity++;
    } else {
        
        alert('maximum purchase limit 3 sets per game.');
    }

    

    showCart()

    
};

const showCart = () => {
    Container.textContent = '';

    shoppingCartProducts.forEach((item) => {
        const clone = template.content.cloneNode(true);

        clone.querySelector('.template_quantity').textContent = item.quantity
        clone.querySelector('.template_list').textContent=item.title
        clone.querySelector('.total').textContent=item.cost * item.quantity


        clone.querySelector('.button-Add').dataset.id = item.id;
		clone.querySelector('.button_Delete').dataset.id = item.id;

        fragment.appendChild(clone);
    });

    Container.appendChild(fragment);
    showTotal()
};


const showTotal = () => {
    template_total.textContent = '';
	const total = shoppingCartProducts.reduce((acc, current) => {
		return acc + current.quantity * current.cost;
	}, 0);

	const clone = template_total_purchase.content.cloneNode(true);
	clone.querySelector('.template_total_suma').textContent = total;
	template_total.appendChild(clone);
};

const btnDelete =(e) => {
	shoppingCartProducts = shoppingCartProducts.filter((item) => {
		if (e.target.dataset.id === item.id) {
			if (item.quantity > 0) {
				item.quantity--;
				if (item.quantity === 0) return;
				return item;
			}
		} else {
			return item;
		}
	});

	showCart();
};

const btnAdd = (e) => {
    shoppingCartProducts = shoppingCartProducts.map((item) => {
        if (e.target.dataset.id === item.id) {
            if (item.quantity < limiteDeCompra) {
                item.quantity++;
            } else {
                
                alert('maximum purchase limit 3 sets per game.');
            }
        }
        return item;
    });

    showCart();
};





document.addEventListener('click', (e) => {
    if(e.target.matches('.buy')){
        addtoCart(e);
    }    

    if (e.target.matches('.button-Add')){
        btnAdd(e);
    }

    if (e.target.matches('.button_Delete')){
        btnDelete(e);
    }

    


    
});