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
//自定义类型
const SubjectType = new GraphQLObjectType({
  name: 'SubjectType',
  fields: {
    id: {
      type: GraphQLInt
    },
    title: {
      type: GraphQLString
    },
    genres: {
      type: GraphQLString
    },
    rating: {
      type: GraphQLFloat
    },
    theater: {
      type: GraphQLInt
    }


  }

})

const MutationRootType = new GraphQLObjectType({
  name: 'MutationRootType',
  fields: {
    create: {
      type: SubjectType,    //可以自己定义
      args: {
        title: {
          //设置不为空
          type:  GraphQLNonNull(GraphQLString)
        },
        genres: {
          type: GraphQLNonNull(GraphQLString)
        },
        rating: {
          type: GraphQLNonNull(GraphQLFloat)
        }
      },
      resolve(obj,args) {
        let{
          title,
          genres,
          rating
        }=args
        return axios({
          url: '',
          method: 'POST',
          data:{
            title,genres,rating

          }
        }).then(result=>result.data)

      }
    }
  }
})

const ListType = new GraphQLObjectType({
  name:'ListType',
  fields:{
    id:{
      type:GraphQLInt
    },
    sales_title:{
      type:GraphQLString
    },
    sales_desc:{
      type:GraphQLString
    },
    sales_thumb:{
      type:GraphQLString
    }
  }

})


//定义schema
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({ //query表示查询操作
    name: 'RootQueryType', //name可以随便起名
    fields: {
      lux: {
        type: new GraphQLList(ListType),
        resolve() {
          return axios({
            url: 'https://apim.restful.5lux.com.cn/index/other_advert'
          }).then((result) => {
            return result.data.data.flash_sales
          })
        }
      },
      hello: { //定义hello字段
        type: GraphQLString,
        resolve() { //返回值
          return 'word'
        }
      },
      //一个query里面可以定义多个字段，字段里可以是集合，集合里面还有自定义字段
      //subjects是一个集合 集合里有元素，元素的类型是SubjectType
      subjects: {
        type: new GraphQLList(SubjectType),
        resolve() {
          return axios({
            url: 'https://apim.restful.5lux.com.cn/index/other_advert'
          }).then((result) => {
            return result
          })
        }
      },

      //查询单条数据，需要id
      subject: {
        type: SubjectType,

        //获取客户端传过来的数据
        args: {
          id: {
            type: GraphQLInt
          }
        },
        resolve(obj, args, context) { //obj上下文对象，args客户端传过来的参数,
          return axios({
            url: `/subjects/${args.id}`
          }).then((result) => {
            return result.data
          })

        }
      },

    }
  }),
  mutation:MutationRootType
})


export default schema