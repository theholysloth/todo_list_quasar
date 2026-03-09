/*export function someMutation ( state ) {
    
    //c'est le seul endroit ou on a le droit de modifier directement une donnée
    //il permet d'avoir une sorte de tracabilité , grace à l'outils vue devTools on peut litteralement savoir quel composant à modifié la donnée
    //chaque fonction recoit en parametre le state puis un payload qui est la modification à) appliquer 

}*/

import state from "./state"

//on pourra mettre ici les addTask et updateTask...
//on appelle les mutation avec des commits du style dans un composant : this.$store.commit('nom de la fonction', payload); ou voir fichier action.js
//on utilise la premiere methode directement sans passer par action pour des actions simple directe , qui ne necessite pas de logique ni d'appel API

export default {
    ADD_TASK(state,task){
        state.tasks.push(task)
    },
    
    UPDATE_TASK(state,payload){
        const {index , nom, task, date}= payload
        state.tasks.splice(index,1,{
            ...state.tasks[index],
            nom,
            task,
            date 
        })
    }
}