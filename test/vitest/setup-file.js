// This file will be run before each test file
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { vi } from 'vitest'

installQuasarPlugin()//dans l'environnement entier 

// vi permet de créer des Mock (global) de $q.notify
/*mock : objet global simulé qui remplace une dependance/fonction pour l'environnement de test(au lieu de config au cas par cas)*/
/*juste un element qui fait semblant d'etre un autre  */

vi.mock('quasar', async () => {
  const actual = await vi.importActual('quasar')
  return {//on utilise notre quasar sauf qu'on remplace notify par un mocké
    ...actual,
    useQuasar: () => ({//du coup il n'y aura pas une vraie notif qui s'affichera grace au mock UseQuasar
      notify: vi.fn()//permet de verifier que la notif a été appellé
    })
  }
})
