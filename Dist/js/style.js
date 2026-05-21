// Inisialisasi AOS (Chapter 1:21:41)
AOS.init({
    duration: 1200,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Navbar Functionality (Chapter 12:33)
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');

hamburger.addEventListener('click', () => {
    hamburger.querySelector('i').classList.toggle('ri-menu-line');
    hamburger.querySelector('i').classList.toggle('ri-close-line');
    navMenu.classList.toggle('active');
});

// Navbar Scroll Effect
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    lastScrollTop = scrollTop;
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        // Close mobile menu
        navMenu.classList.remove('active');
        hamburger.querySelector('i').classList.add('ri-menu-line');
        hamburger.querySelector('i').classList.remove('ri-close-line');
    });
});

// Filter Produk (Chapter 1:01:39 - 1:04:51) - PERSIS VIDEO
const filterBtns = document.querySelectorAll('.filter-btn');
const produkCards = document.querySelectorAll('.produk-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        // Filter cards
        produkCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (filterValue === 'semua' || cardCategory === filterValue) {
                card.classList.remove('hidden');
                // Trigger AOS refresh for animation
                AOS.refresh();
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// Tambah 12 produk card di HTML dengan data-category="elektronik/fashion/aksesoris"
document.addEventListener('DOMContentLoaded', () => {
    console.log('Katalog Produk siap! Filter aktif.');
});

document.addEventListener('DOMContentLoaded', () => {
  const productModal = document.getElementById('productModal');
  const closeProductModal = document.getElementById('closeProductModal');
  const modalProductName = document.getElementById('modalProductName');
  const modalProductImage = document.getElementById('modalProductImage');
  const modalProductPrice = document.getElementById('modalProductPrice');
  const qtyInput = document.getElementById('qtyInput');
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');
  const modalTotalQty = document.getElementById('modalTotalQty');
  const modalTotalPrice = document.getElementById('modalTotalPrice');
  const checkoutBtn = document.getElementById('checkoutBtn');

  let currentProduct = {
    name: '',
    price: 0,
    image: '',
    qty: 1
  };

  function updateTotal() {
    let qty = parseInt(qtyInput.value) || 1;
    if (qty < 1) qty = 1;
    qtyInput.value = qty;
    currentProduct.qty = qty;
    modalTotalQty.textContent = qty;
    modalTotalPrice.textContent = `Rp ${(currentProduct.price * qty).toLocaleString('id-ID')}`;
  }

  document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      currentProduct.name = btn.dataset.name;
      currentProduct.price = parseInt(btn.dataset.price);
      currentProduct.image = btn.dataset.image;
      currentProduct.qty = 1;

      modalProductName.textContent = currentProduct.name;
      modalProductImage.src = currentProduct.image;
      modalProductImage.alt = currentProduct.name;
      modalProductPrice.textContent = `Rp ${currentProduct.price.toLocaleString('id-ID')}`;

      qtyInput.value = 1;
      modalTotalQty.textContent = 1;
      modalTotalPrice.textContent = `Rp ${currentProduct.price.toLocaleString('id-ID')}`;

      productModal.classList.add('active');
    });
  });

  qtyPlus.addEventListener('click', () => {
    qtyInput.value = parseInt(qtyInput.value) + 1;
    updateTotal();
  });

  qtyMinus.addEventListener('click', () => {
    let qty = parseInt(qtyInput.value);
    if (qty > 1) {
      qtyInput.value = qty - 1;
      updateTotal();
    }
  });

  qtyInput.addEventListener('input', updateTotal);

  closeProductModal.addEventListener('click', () => {
    productModal.classList.remove('active');
  });

  productModal.addEventListener('click', (e) => {
    if (e.target === productModal) {
      productModal.classList.remove('active');
    }
  });

  checkoutBtn.addEventListener('click', () => {
    const customerName = document.getElementById('customerName').value.trim();
    const customerClass = document.getElementById('customerClass').value.trim();

    if (!customerName || !customerClass) {
        alert('Nama dan Kelas wajib diisi sebelum checkout.');
        return;
    }

    const total = currentProduct.price * currentProduct.qty;

    const message = `
Halo, saya mau pesan:
Nama: ${customerName}
Kelas: ${customerClass}
Produk: ${currentProduct.name}
Jumlah: ${currentProduct.qty}
Harga Satuan: Rp ${currentProduct.price.toLocaleString('id-ID')}
Total: Rp ${total.toLocaleString('id-ID')}
    `.trim();

    const waNumber = '6281234567890';
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
});

});

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const produkCards = document.querySelectorAll('.produk-card');

  let currentFilter = 'all';

  function applyFilter() {
    const keyword = searchInput.value.toLowerCase().trim();

    produkCards.forEach(card => {
      const titleEl = card.querySelector('h3');
      const title = titleEl ? titleEl.textContent.toLowerCase() : '';
      const category = (card.dataset.category || '').toLowerCase();

      const matchSearch = title.includes(keyword);
      const matchCategory = currentFilter === 'all' || category === currentFilter;

      card.style.display = (matchSearch && matchCategory) ? 'flex' : 'none';
    });
  }

  searchInput.addEventListener('input', applyFilter);

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = (btn.dataset.filter || 'all').toLowerCase();
      applyFilter();
    });
  });

  applyFilter();
});