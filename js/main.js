/**
 * Aman Mohamed Ali — Portfolio Scripts
 * Interactive filters, terminal simulation, and clipboard handling.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Project Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCols = document.querySelectorAll('.project-col');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCols.forEach((col) => {
        const category = col.getAttribute('data-category');
        if (filterValue === 'all' || category.includes(filterValue)) {
          col.style.display = 'block';
          col.style.animation = 'fadeIn 0.35s ease';
        } else {
          col.style.display = 'none';
        }
      });
    });
  });

  // 2. Email Copy to Clipboard
  const copyBtn = document.getElementById('copyEmailBtn');
  const copyToast = document.getElementById('copyToast');

  if (copyBtn && copyToast) {
    copyBtn.addEventListener('click', () => {
      const email = copyBtn.getAttribute('data-email') || '69119173+spidervirus@users.noreply.github.com';
      navigator.clipboard.writeText(email).then(() => {
        copyToast.classList.add('show');
        setTimeout(() => {
          copyToast.classList.remove('show');
        }, 2500);
      });
    });
  }

  // 3. Navbar scroll effect
  const navbar = document.querySelector('.navbar-custom');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
      navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.12)';
    } else {
      navbar.style.boxShadow = 'none';
      navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
    }
  });

  // 4. Interactive Terminal Typing
  const terminalCmd = document.getElementById('terminalCmd');
  if (terminalCmd) {
    const commands = [
      'aman.currentFocus',
      'aman.primaryStack',
      'aman.location',
      'aman.contributions',
    ];
    let cmdIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
      const current = commands[cmdIndex];
      if (isDeleting) {
        terminalCmd.textContent = current.substring(0, charIndex--);
      } else {
        terminalCmd.textContent = current.substring(0, charIndex++);
      }

      let speed = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === current.length + 1) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        cmdIndex = (cmdIndex + 1) % commands.length;
        speed = 500;
      }

      setTimeout(typeLoop, speed);
    }

    setTimeout(typeLoop, 800);
  }
});
