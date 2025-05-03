const searchForm = document.querySelector(".search-form");
const cartItem = document.querySelector(".cart-items-container");
const navbar = document.querySelector(".navbar");

//! buttonlar

const searchBtn = document.querySelector("#search-btn");
const cartBtn = document.querySelector("#cart-btn");
const menuBtn = document.querySelector("#menu-btn");

console.log(menuBtn);
console.log(navbar);

searchBtn.addEventListener("click", function(){
    
    searchForm.classList.toggle("active") /*arama ikonuna tıkladığımızda arama çubuğu çıkar tekrar bastiğimizda gizlenir eğer "add" ekleseydik "toggle" yerine sadece açılırdı kapanmazdı tekrar*/
    document.addEventListener("click", function(e){
        if(
            !e.composedPath().includes(searchBtn) && 
            !e.composedPath().includes(searchForm) /*arama çubuğunun içerisine tıkladığımda çubuğun kaybolmaması için*/
        ){
            searchForm.classList.remove("active"); /*boşluğa tıkladığımızda arama çubuğunun kaybolmasını sağladım*/

        }
    })
});

cartBtn.addEventListener("click", function(){
    
    cartItem.classList.toggle("active") 
    document.addEventListener("click", function(e){
        if(
            !e.composedPath().includes(cartBtn) && 
            !e.composedPath().includes(cartItem) 
        ){
            cartItem.classList.remove("active"); 
        }
    })
});

menuBtn.addEventListener("click", function(){
    console.log("Menu button clickked!")
    
    navbar.classList.toggle("active");
    document.addEventListener("click", function(e){
        if(
            !e.composedPath().includes(menuBtn) && 
            !e.composedPath().includes(navbar) 
        ){
            navbar.classList.remove("active"); 
        }
    })
});

document.getElementById('user-btn').addEventListener('click', function() {
    window.location.href = 'odeme_formu.html'; // GİRİŞ SAYFASINA YÖNLENDİRİR.
});

document.querySelector('.dropbtn').addEventListener('click', function() {
    const dropdownContent = document.querySelector('.dropdown-content');
    dropdownContent.classList.toggle('show');
});

window.addEventListener('click', function(e) {
    if (!e.target.matches('.dropbtn')) {
        const dropdownContent = document.querySelector('.dropdown-content');
        if (dropdownContent.classList.contains('show')) {
            dropdownContent.classList.remove('show');
        }
    }
});

// Sepet işlemleri için JavaScript kodu
let sepet = [];

// Sepete ürün ekleme
function urunEkle(urunId, urunAdi, urunFiyati) {
    const mevcutUrun = sepet.find(urun => urun.id === urunId);
    if (mevcutUrun) {
        mevcutUrun.adet += 1;
    } else {
        sepet.push({ id: urunId, ad: urunAdi, fiyat: urunFiyati, adet: 1 });
    }
    localStorage.setItem('sepet', JSON.stringify(sepet)); // Sepeti kaydet
    sepetiGuncelle();
}

function urunCikar(urunId) {
    const mevcutUrun = sepet.find(urun => urun.id === urunId);
    if (mevcutUrun) {
        if (mevcutUrun.adet > 1) {
            mevcutUrun.adet -= 1;
        } else {
            sepet = sepet.filter(urun => urun.id !== urunId);
        }
    }
    localStorage.setItem('sepet', JSON.stringify(sepet)); // Sepeti kaydet
    sepetiGuncelle();
}


// Sepeti güncelleme
function sepetiGuncelle() {
    cartItem.innerHTML = ''; // Eski içerikleri temizle

    sepet.forEach(urun => {
        const urunHtml = `
            <div class="cart-item">
                <i class="fa-solid fa-xmark" onclick="urunCikar('${urun.id}')"></i>
                <div class="content">
                    <h3>${urun.ad}</h3>
                    <div class="fiyat">${urun.fiyat}₺</div>
                    <div>Adet: ${urun.adet}</div>
                    <button onclick="urunEkle('${urun.id}', '${urun.ad}', ${urun.fiyat})">+</button>
                    <button onclick="urunCikar('${urun.id}')">-</button>
                </div>
            </div>
        `;
        cartItem.innerHTML += urunHtml;
    });
}
document.getElementById('cart-btn').addEventListener('click', function() {
    const checkoutButton = document.getElementById('checkout-btn');
    if (checkoutButton) {
        checkoutButton.style.display = 'block';
    }
});

