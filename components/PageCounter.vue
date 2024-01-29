<template>
  <div class="container">
    <div class="left-controls">
      <button class="move" @click="moveStart()">
        <i class="pi pi-angle-double-left"></i>
      </button>
      <button class="move" @click="movePrevious()">
        <i class="pi pi-angle-left"></i>
      </button>
    </div>
    <div class="pages">
      <ul class="list">
        <li v-for="i in getPages()" :key="`page-${i}`" class="center">
          <NuxtLink :to="`/offer/${categoryId}/${i}`"
            ><span :class="i === page ? 'active' : ''">{{ i }}</span></NuxtLink
          >
        </li>
      </ul>
    </div>
    <div class="right-controls">
      <button class="move" @click="moveNext()">
        <i class="pi pi-angle-right"></i>
      </button>
      <button class="move" @click="moveEnd()">
        <i class="pi pi-angle-double-right"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { categoryId, page, lastPageNumber } = defineProps({
  categoryId: {
    type: Number,
    required: true,
  },
  page: {
    type: Number,
    required: true,
  },
  lastPageNumber: {
    type: Number,
    required: true,
  },
});

async function moveNext(): Promise<void> {
  if (page + 1 <= lastPageNumber) {
    await navigateTo(`/offer/${categoryId}/${page + 1}`);
  }
}

async function moveEnd(): Promise<void> {
  await navigateTo(`/offer/${categoryId}/${lastPageNumber}`);
}

async function moveStart(): Promise<void> {
  await navigateTo(`/offer/${categoryId}/${1}`);
}

async function movePrevious(): Promise<void> {
  if (page - 1 >= 1) {
    await navigateTo(`/offer/${categoryId}/${page - 1}`);
  }
}

const getPages = () => {
  const pages: number[] = [];
  let count = 9;
  for (let i = 1; i < page; i++) {
    pages.push(i);
    count--;
  }
  pages.push(page);

  for (
    let i: number = page + 1;
    i <= (page + count <= lastPageNumber ? page + count : lastPageNumber);
    i++
  ) {
    pages.push(i);
  }
  return pages;
};
</script>

<style scoped>
.list {
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 0px;
}
.list li {
  cursor: pointer;
}
.container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  user-select: none;
}
.active {
  font-weight: bold;
  border-radius: 50%;
  background-color: #14b8a6;
  color: white;
  display: block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.move {
  display: inline-block;
  background-color: transparent;
  cursor: pointer;
  border-radius: 50%;
  border: 1px solid #bfbfbf;
  height: 40px;
  width: 40px;
  text-align: center;
  line-height: 40px;
  margin: 10px;
}
.move i {
  text-align: center;
}
.pages {
  display: inline-block;
  width: calc(80% - 200px);
}
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.left-controls {
  margin-left: 40px;
  margin-right: 60px;
  align-self: center;
}
.right-controls {
  margin-left: 60px;
  margin-right: 40px;
  align-self: center;
}
a {
  text-decoration: none;
  color: black;
}
</style>
