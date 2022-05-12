import { useState, useEffect } from 'react';
import { firestore, convertCollectionsSnapshotToMap, convertDirectorySnapshotToMap } from './firebase.utils'

const useFirebaseCollections = () => {
   const [error, setError] = useState(false)
   const [loading, setLoading] = useState(true)
   const [collections, setCollections] = useState([])
 
   useEffect(() => {
      const unsubscribe = firestore
         .collection('collections')
         .get()       
         .then(snapshot => {       
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot)     
            // const data = []            
            // snapshot.forEach(doc => { data.push(doc) })                       
               setCollections(collectionsMap)  
               setLoading(false)         
            })
         .catch(err => {            
            setError(err);
            console.log(err.message)         
         }) 
      return () => unsubscribe()
   },[])
 
   return {
     error,
     loading,
     collections,
   }
}

const useFirebaseDirectory = () => {
   const [error, setError] = useState(false)
   const [loading, setLoading] = useState(true)
   const [directory, setDirectory] = useState([])
   
   useEffect(() => {
      const unsubscribe = firestore
         .collection('directory')
         .get()       
         .then(snapshot => {           
            const directoryMap = convertDirectorySnapshotToMap(snapshot)                           
            setDirectory(directoryMap) 
            setLoading(false)     
         })
         .catch(err => {            
            setError(err);
            console.log(err.message)         
         }) 
      return () => unsubscribe()
   },[])
 
   return {
     error,
     loading,
     directory,
   }
}

export { useFirebaseCollections, useFirebaseDirectory };