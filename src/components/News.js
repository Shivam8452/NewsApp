import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export default class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 21,
    category: 'general'
  }
  static propTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }
  capitalize = (string)=>{
    return string.charAt(0).toUpperCase()+ string.slice(1)
  }
  constructor(props){
    super(props);
    // console.log("Hello I am constructor")
    this.state={
       articles:[],
       loading:false,
       page:1,
    }
    document.title=`${this.capitalize(this.props.category) } - NewsApp`
  }

  async componentDidMount(){
    this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7153d5a3b3874786b48965a82eb08512&page=1&pageSize=${this.props.pageSize}`
    this.setState({loading:true})
    let data = await fetch(url);
    this.props.setProgress(40)
    let parsedata = await data.json();
    this.props.setProgress(70)
    this.setState({
      articles:parsedata.articles,
      totalResults: parsedata.totalResults,
      loading:false
  })
  this.props.setProgress(100)
  }
 handlenext =  async ()=>{
  //  console.log("Next")
  this.props.setProgress(10)
  if(! (this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7153d5a3b3874786b48965a82eb08512&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    this.setState({loading:true})
  let data = await fetch(url);
  this.props.setProgress(40)
  let parsedata = await data.json();
  this.props.setProgress(70)
    this.setState({
      page: this.state.page + 1,
      articles:parsedata.articles,
      loading: false
    })
    this.props.setProgress(100)
  }

  }
  handleprev = async () =>{
    // console.log("previous")
    this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7153d5a3b3874786b48965a82eb08512&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    this.setState({loading: true})
    let data = await fetch(url);
    this.props.setProgress(40)
    let parsedata = await data.json();
    this.props.setProgress(70)
      this.setState({
        page: this.state.page - 1,
        articles: parsedata.articles,
        loading: false
      })
      this.props.setProgress(100)
  }
  render() {
    return (
       <div className="container my-3">
       <h1 className='text-center' style={{marginTop: '80px'}}>NewsApp - Top {this.capitalize(this.props.category)} Headlines</h1>
       {this.state.loading && <Spinner/>}
          <div className="row">
       {!this.state.loading && this.state.articles.map((element)=>{
         
           return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title?element.title:" "} description={element.description?element.description:" "} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
       })}
          </div>
          <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handleprev}>&larr; Prev</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handlenext}> Next &rarr;</button>
          </div>
       </div>
    )
  }
}
