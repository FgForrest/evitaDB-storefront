<template>
  <div>
    <Menubar v-if="data && data.listCategory && !loading" :model="getItems()">
      <template #start>
        <object width="35" height="40" data="/no-image.svg"></object>
      </template>
      <template #item="{ item, props, hasSubmenu, root }">
        <NuxtLink
          :to="item.link"
          v-ripple
          class="flex align-items-center"
          v-bind="props.action"
        >
          <span :class="item.icon"></span>
          <span class="ml-2">{{ item.label }}</span>
          <Badge
            v-if="item.badge"
            :class="{ 'ml-auto': !root, 'ml-2': root }"
            :value="item.badge"
          />
          <span
            v-if="item.shortcut"
            class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1"
            >{{ item.shortcut }}</span
          >
          <i
            v-if="hasSubmenu"
            :class="[
              'pi pi-angle-down',
              { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root },
            ]"
          ></i>
        </NuxtLink>
      </template>
      <template #end>
        <div class="flex align-items-center gap-2">
          <InputText
            placeholder="Search"
            type="text"
            class="w-8rem sm:w-auto"
          />
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script lang="ts" setup>
import { useListCategoryQuery } from "../generated/operations";

const { result: data, loading } = useListCategoryQuery();

function getItems(): Object[] {
  const menuItems: Object[] = [];
  menuItems.push({
    label: "Home",
    icon: "pi pi-home",
    link: "/",
  });
  if (data.value) {
    for (const menuItem of data.value?.listCategory.filter(
      (x) => !x.parentPrimaryKey
    )) {
      const subItemsNames = data.value?.listCategory.filter(
        (x) => x.parentPrimaryKey === menuItem.primaryKey
      );
      const subItems: Object[] = [];
      for (const subItem of subItemsNames) {
        subItems.push({
          label: subItem?.attributes?.name,
          icon: `pi pi-${subItem?.attributes?.name.replace("s", "")}`,
          link: `/offer/${subItem.primaryKey}/1`,
        });
      }
      if (subItems.length > 0) {
        menuItems.push({ label: menuItem.attributes?.name, items: subItems });
      } else {
        menuItems.push({ label: menuItem?.attributes?.name });
      }
    }
  }
  return menuItems;
}
</script>

<style scoped>
ul {
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid black;
  padding-left: 0px;
  padding-bottom: 16px;
  padding-top: 0px;
}
ul li a {
  text-decoration: none;
  color: black;
  font-weight: bold;
}
</style>
