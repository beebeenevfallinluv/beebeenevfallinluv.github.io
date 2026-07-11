// Menu mobile
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Fermer le menu au clic sur un lien + gérer le lien actif
const links = document.querySelectorAll('.nav-links a');
links.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    links.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// Highlight du lien actif selon la section visible au scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  links.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
});

// Validation + feedback du formulaire de contact
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const nomInput = document.getElementById('nom');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  const nom = nomInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  let erreurs = [];

  if (nom === '') erreurs.push('Le nom est requis.');
  if (email === '') {
    erreurs.push('L\'email est requis.');
  } else if (!isValidEmail(email)) {
    erreurs.push('L\'email n\'est pas valide.');
  }
  if (message === '') {
    erreurs.push('Le message est requis.');
  } else if (message.length < 10) {
    erreurs.push('Le message est trop court (10 caractères minimum).');
  }

  if (erreurs.length > 0) {
    formFeedback.textContent = erreurs.join(' ');
    formFeedback.className = 'form-feedback error';
    return;
  }

  // Tout est valide → ouverture du client mail
  const destinataire = 'yemalinschadasgedeonkossouho@gmail.com';
  const sujet = `Message de ${nom} via le portfolio`;
  const corps = `De: ${nom} (${email})%0D%0A%0D%0A${message}`;

  window.location.href = `mailto:${destinataire}?subject=${encodeURIComponent(sujet)}&body=${corps}`;

  formFeedback.textContent = 'Message prêt à être envoyé, votre client mail va s\'ouvrir.';
  formFeedback.className = 'form-feedback success';

  this.reset();
});