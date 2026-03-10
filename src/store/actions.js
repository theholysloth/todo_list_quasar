/*export function someAction (context ) {

    //ce fichier sert d'intermediaire , c'est là que se passe toute la logique metier et ce qui prend du temps 
    // une action peut appeller des mutations , plusieurs à la fois , peut appeller des api ce qui est interdit dans les mutattions car les mutations sont sychrones
    //c'est l'acction qui declenche la mutation
    //on utiliise dispatch pour appeller une action
}*/

export function addTask({ commit}, task){
    //ici on peut mettre de la logique, par exemple un apple à une API 
    commit('ADD_TASK',task)
}

export function updateTask({commit}, payload){
    commit('UPDATE_TASK',payload)
}
export function deleteTask({commit},index){
    commit('DELETE_TASK',index)
}
export function toggleDone({commit}, index){
    commit('TOGGLE_DONE', index)
}

export function setSearch({commit}, value){
    commit('SET_SEARCH',value)
}

/*

qialog pour les suppressions

composant bounedit et boutondelelte et le composans tasklist va provide les informations aux deux boutons et eux ils vont inject ces données là pour fonctionner 

passer par un qialog pour ajouter et modifier une tache 

avec Notify, afficher des popup qui signalent quand une tache est terminé, effacée, modifiée et joutée


*/