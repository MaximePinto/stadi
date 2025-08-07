<template>
  <footer class="footer-container">
    <div class="footer-content">
      <p class="footer-text">© 2024 Stadi - Overwatch 2 Build Creator. Tous droits réservés.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer-container {
  background: linear-gradient(to right, var(--surface), var(--surface-hover));
  color: var(--text);
  border-top: 1px solid var(--border);
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-xl) var(--space-md);
  text-align: center;
}

.footer-text {
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: var(--text-muted);
  margin: 0;
}
</style>