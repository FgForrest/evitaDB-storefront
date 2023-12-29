<template>
  <div>
    <p>Brand</p>
    <Tree
      :value="nodes()"
      selectionMode="checkbox"
    ></Tree>
  </div>
</template>

<script setup lang="ts">
const { categoryId } = defineProps(["categoryId"]);

const queryPage = gql`
  query getBrands($categoryId: [Int!]) {
    queryProduct(
      filterBy: {
        hierarchyCategoriesWithin: {
          ofParent: { entityPrimaryKeyInSet: $categoryId }
        }
        entityLocaleEquals: en
      }
    ) {
      extraResults {
        facetSummary {
          brand {
            count
            facetStatistics {
              facetEntity {
                primaryKey
                attributes {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

type ListBrand = {
  queryProduct: {
    extraResults: {
      facetSummary: {
        brand: {
          count: number;
          facetStatistics: {
            facetEntity: {
              primaryKey: number;
              attributes: {
                name: String;
              };
            };
          }[];
        };
      };
    };
  };
};
const { data } = await useAsyncQuery<ListBrand>(queryPage, {
  categoryId: parseInt(categoryId),
});

const nodes = () => {
  const brands: Object[] = [];
  const rawBrands =
    data.value.queryProduct.extraResults.facetSummary.brand.facetStatistics;
  for (let i = 0; i < rawBrands.length; i++) {
    brands.push({
      key: i,
      label: rawBrands[i].facetEntity.attributes.name,
      data: rawBrands[i].facetEntity.attributes.name,
    });
  }
  return brands;
};
</script>

<style scoped></style>
