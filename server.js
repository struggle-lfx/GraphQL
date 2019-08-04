import express from 'express'

import graphqlHTTP from 'express-graphql' //可视化工具

import schema from './schema'
import {
  graphql
} from 'graphql'

import schema2 from './schema2'

const app = express()


//可视化窗口可以进行测试，测试完再封装成接口
app.use('/he', graphqlHTTP({
  schema,
  graphiql: true
}))

app.use('/world', graphqlHTTP({
  schema: schema2,
  graphiql: true
}))




//定义接口
app.use('/hello', (req, res) => {
  graphql(schema, '{hello}') //query传入上面定义的hello字段
    .then((result) => {
      res.send(result)
    })

})



app.use('/getSubject', (req, res) => {

  //使用时  /getSubject/?id=1
  const id = req.query.id
  const query = `{
    subject(id:${id}){
      id,
      title
    }
  }`
  graphql(schema, query).then((result) => {
    res.send(result)
  })

})

//自定义接口
app.use('/getlist', (req, res) => {
  const query = `{
    lux{
      id,sales_title,
      sales_desc,sales_thumb
    }
  }`
  graphql(schema, query).then((result) => {
    res.send(result)
  })
})

app.use('/getdetail', (req, res) => {
  const query = `{
    article_list{    
      ads_info{
        ad_id,
        ad_name,
        ad_link,
        product_info{
          id,
          product_price
        }
      }   
    }
  }`
  graphql(schema2, query).then((result) => {
    res.send(result)
  })
})


app.listen(3333)