import React from 'react'
import {StyleSheet, View, Button, TextInput, FlatList, Text, ActivityIndicator} from 'react-native'
import FilmItem from './FilmItem'
import {getFilmsFromApiWithSearchedText} from './API/TMDBApi'

export default class Search extends React.Component {

    constructor(props){
        super(props)
        this.page = 0
        this.totalPages = 0
        this.state = {films:[],
        isLoading: false}
        this.searchedText = ""
    }

_loadFilms(){
this.setState({isLoading: true})
    if(this.searchedText.length > 0){
getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data=>{
    this.page = data.page
    this.totalPages = data.totalPages
    this.setState({
        films: this.state.films.concat(data.results),
    //films: [...this.state.films, ...data.results], 
    isLoading: false
})
}
)
    }

}

_displayLoading(){
    if(this.state.isLoading){
        return(
            <View style={styles.loading_container}><ActivityIndicator size='large'/></View>

        )
    }
}

_searchTextInputChanged(text){

    this.searchedText = text

}

    render(){
       // console.log(this.state.isLoading);
        return(

            <View style={styles.main_container}>
                <TextInput onSubmitEditing={()=>this._loadFilms()} onChangeText={(text)=> this._searchTextInputChanged(text)} style={styles.textInput} placeholder='Titre du film'></TextInput>
                <Button title="Rechercher" onPress={()=>this._loadFilms()}></Button>
                <FlatList
  data={this.state.films}
  keyExtractor={(item) => item.id.toString()}
  onEndReachedThreshold={0.5}
  onEndReached={()=>
{
    if(this.page<this.totalPages){
        this._loadFilms
    }
}}
  renderItem={({item}) => <FilmItem film = {item}></FilmItem>}
/>
{this._displayLoading()}
            </View>

        )
    }
}

const styles = StyleSheet.create({
    main_container : {
        marginTop:25,
        flex:1
    },
    textInput : {
        marginLeft: 5, marginRight: 5, height: 50, borderColor: '#000000', borderWidth: 1, paddingLeft: 5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }
})