import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull
} from 'graphql'

import axios from 'axios'
const ProductType = new GraphQLObjectType({
  name:'ProductType',
  fields:{
    id:{
      type:GraphQLInt
    },
    sku_title:{
      type:GraphQLString
    },
    product_thumb:{
      type:GraphQLString
    },
    product_price:{
      type:GraphQLString
    }
  }
})

const ObjType = new GraphQLObjectType({
  name:'ObjType',
  fields:{
    ad_id:{
      type:GraphQLInt
    },
    ad_name:{
      type:GraphQLString
    },
    ad_link:{
      type:GraphQLString
    },
    product_info:{
      type: new GraphQLList(ProductType)
    }
  }
})
const ListType = new GraphQLObjectType({
  name:'ListType',
  fields:{
    ads_info:{
      type:ObjType
    }
  }
})



//定义schema
const schema2 = new GraphQLSchema({
  query: new GraphQLObjectType({ //query表示查询操作
    name: 'RootQueryType', //name可以随便起名
    fields: {
      article_list: {
        type: new GraphQLList(ListType),//下面有多组就需要使用GraphQLList
        resolve() {
          return axios({
            url: 'https://apim.restful.5lux.com.cn/index/other_advert'
          }).then((result) => { 
            return result.data.data.article_list
          })
        }
      }
    }
  })
})


export default schema2