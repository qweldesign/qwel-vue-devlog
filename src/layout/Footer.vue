<script lang="ts" setup>
import GitHubIcon from '../assets/icons/icon-github.svg'
import SendIcon from '../assets/icons/icon-send.svg'
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
      <a class="footer-link" href="https://github.com/qweldesign" target="_blank" rel="noopener">
        <GitHubIcon />
        <span>GitHub</span>
      </a>
      <a class="footer-link" href="https://qwel.design/tools/contact-form/" target="_blank" rel="noopener">
        <SendIcon />
        <span>Contact Me</span>
      </a>
      <small>&copy; 2019 - {{ new Date().getFullYear() }} QWEL.DESIGN</small>
    </div>
  </footer>
</template>
