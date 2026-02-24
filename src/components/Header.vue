<script lang="ts" setup>
import { sections, socials } from '../types/navigation'
import XIcon from '../assets/icons/icon-x.svg'
import FacebookIcon from '../assets/icons/icon-facebook.svg'
import InstagramIcon from '../assets/icons/icon-instagram.svg'

const componentsMap = {
  x: XIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon
}
</script>

<template>
  <header class="header">
    <div class="header__inner">
      <nav class="nav">
        <h1 class="sitebrand">
          <img src="/images/logo.svg" alt="QWEL in Action" />
        </h1>
        <ul class="primary-menu">
          <li class="primary-menu__item" v-for="name in sections">
            <a :href="`#${name}`">{{ name }}</a>
          </li>
        </ul>
        <ul class="social-menu">
          <li class="social-menu__item" v-for="name in socials">
            <a :href="`https://${name}.com/qweldesign`" target="_blank" rel="noopener">
              <component :is="componentsMap[name]" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
