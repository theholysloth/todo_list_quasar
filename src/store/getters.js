/*export function someGetter (state) {
    return state.tasks.length
}*///est une facon de faire , permet d'en definir plusieurs fonctions separement avec la meme syntaxe

export default {
    totalTasks: (state) => {//state est un etat definit dans state.js
        return state.tasks.length
    },

    tasks: (state) => {
        return state.tasks
    }
}
