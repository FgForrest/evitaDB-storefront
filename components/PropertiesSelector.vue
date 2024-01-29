<template>
  <Tree
    :value="nodes()"
    selectionMode="checkbox"
    class="w-full md:w-30rem"
  ></Tree>
</template>

<script setup lang="ts">
const { categoryId } = defineProps({
  categoryId: {
    type: Number,
    required: true,
  },
});

const getParametrs = gql`
  query getParametrs($categoryId: [Int!]) {
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
          parameterValues {
            count
            groupEntity {
              primaryKey
              attributes {
                code
                name
              }
            }
            facetStatistics {
              requested
              impact {
                difference
                hasSense
                matchCount
              }
              facetEntity {
                primaryKey
                attributes {
                  code
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

type ListProperty = {
  queryProduct: {
    extraResults: {
      facetSummary: {
        parameterValues: [
          {
            count: Number;
            groupEntity: {
              primaryKey: Number;
              attributes: {
                code: String;
                name: String;
              };
            };
            facetStatistics: [
              {
                requested: Boolean;
                impact: {
                  difference: Number;
                  hasSense: Boolean;
                  matchCount: Number;
                };
                facetEntity: {
                  primaryKey: Number;
                  attributes: {
                    code: String;
                    name: String;
                  };
                };
              }
            ];
          }
        ];
      };
    };
  };
};

const { data } = await useAsyncQuery<ListProperty>(getParametrs, {
  categoryId: categoryId,
});

const nodes = () => {
  const properties: Object[] = [];
  const rawProperties =
    data.value.queryProduct.extraResults.facetSummary.parameterValues;
  for (let i = 0; i < rawProperties.length; i++) {
    let property = {
      key: i,
      label: rawProperties[i].groupEntity.attributes.name,
      data: rawProperties[i].groupEntity.attributes.name,
      children: new Array<Object>(),
    };
    for (let j = 0; j < rawProperties[i].facetStatistics.length; j++) {
      property.children.push({
        key: i + "-" + j,
        label: rawProperties[i].facetStatistics[j].facetEntity.attributes.name,
        data: rawProperties[i].facetStatistics[j].facetEntity.attributes.name,
      });
    }
    properties.push(property);
  }
  return properties;
};
</script>

<style scoped></style>
