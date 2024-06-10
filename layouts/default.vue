<template>
  <div>
    <NavMenu />
    <div class="base-view">
      <div class="content">
        <slot />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup></script>

<style>
.base-view {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.content {
  width: 100%;
}

@media only screen and (min-width: 1750px) {
  .content {
    width: 1750px;
  }
}
</style>
