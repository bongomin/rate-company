if(process.env.NODE_ENV === 'production'){
   module.exports ={ mongoURI: 'mongodb+srv://bongomin:P@55w0rd55@rateme-app-dev-5ajkj.mongodb.net/test?retryWrites=true&w=majority'
   
   }

}else{
   module.exports = {mongoURI :'mongodb://localhost/rateme'}

}