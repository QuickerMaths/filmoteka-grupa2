const openModal = document.querySelector('.open-modal-team');
const closeModal = document.querySelector('.close-modal-team');
const teamBackdrop = document.querySelector('.backdrop-modal');
const teamModal = document.getElementsByClassName('team__modal');

openModal.addEventListener('click', openModalTeam);
closeModal.addEventListener('click', closeModalTeam);

function openModalTeam() {
  teamBackdrop.classList.remove('team__backdrop--hidden');
  document.addEventListener('keydown', onEscapeClose);
  document.addEventListener('click', onBackdropClose);
  teamModal[0].classList.add('openModalAnimationTeam');
}

function closeModalTeam() {
  teamModal[0].classList.remove('closeModalAnimationTeam');
  teamBackdrop.classList.add('team__backdrop--hidden');
  document.removeEventListener('keydown', onEscapeClose);
  document.body.style.overflow = '';
}

function onEscapeClose(event) {
  if (event.code === 'Escape') {
    teamModal[0].classList.remove('openModalAnimationTeam');
    teamModal[0].classList.add('closeModalAnimationTeam');
    setTimeout(() => {
      closeModalTeam();
    }, 400);
    closeModalTeam();
  }
}

function onBackdropClose(event) {
  if (event.target === teamBackdrop) {
    teamModal[0].classList.remove('openModalAnimationTeam');
    teamModal[0].classList.add('closeModalAnimationTeam');
    setTimeout(() => {
      closeModalTeam();
    }, 400);
  }
}
