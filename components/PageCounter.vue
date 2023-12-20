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
        <li
          v-for="index in data.queryProduct.recordPage.totalRecordCount"
          :key="index"
          :class="
            !(
              index > page.position - 5 && index < page.position + 5
            )
              ? 'hidden'
              : 'center'
          "
          @click="changePage(index)"
        >
          <span :class="index === page.position ? 'active' : ''">{{
            index
          }}</span>
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
const { categoryId } = defineProps(["categoryId"]);
const emit = defineEmits(["changePage"]);
const page = reactive({
  position: 1,
});

const queryPageCount = gql`
  query {
    queryProduct(
      filterBy: {
        hierarchyCategoriesWithin: {
          ofParent: { entityPrimaryKeyInSet: ${categoryId} }
        }
      }
    ) {
      recordPage {
        totalRecordCount
      }
    }
  }
`;

type TotalCount = {
  queryProduct: {
    recordPage: {
      totalRecordCount: number;
    };
  };
};

const { data } = await useAsyncQuery<TotalCount>(queryPageCount);

function changePage(position: number) {
  page.position = position;
  emit("changePage", page.position);
}

function moveNext() {
  if (
    page.position + 1 <=
    data.value.queryProduct.recordPage.totalRecordCount
  ) {
    page.position++;
    emit("changePage", page.position);
  }
}

function movePrevious() {
  if (page.position - 1 >= 1) {
    page.position--;
    emit("changePage", page.position);
  }
}

function moveStart() {
  page.position = 1;
  emit("changePage", page.position);
}

function moveEnd() {
  page.position = data.value.queryProduct.recordPage.totalRecordCount;
  emit("changePage", page.position);
}
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
.hidden {
  display: none;
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
</style>
