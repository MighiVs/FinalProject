<template>
  <footer class="footer">
    <div class="container">
      <p>&copy; 2023 My To-Do App</p>
      <p>Miguel Vergara</p>
      <div class="icons-container">
        <a href="https://github.com/MighiVs">
          <img src="../assets/icons/github.png" width="40px" alt="github" />
        </a>
        <a href="https://www.linkedin.com/in/miveor/">
          <img src="../assets/icons/linkedin.png" width="40px" alt="linkedin" />
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: transparent;
  padding: 2rem;
  margin-top: 4em;
  font-weight: 600;
}

.footer p {
  margin-top: 1em;
  font-size: 1rem;
}

.icons-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
img {
  margin: 1em;
}
</style>
