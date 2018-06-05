/* eslint-disable no-console */

var onNoteChangeListeners = [];

export function createNotesApi(material){
  return {
    getPageNotes(callback) {
      setTimeout(() => {
        callback([...material.notes.page]);
      }, 1000);
    },
    
    getAllNotes(callback) {
      setTimeout(() => {
        callback([...material.notes.all]);
      }, 1000);
    },
    
    deleteNote(id, callback) {
      const self = this;

      setTimeout(() => {
        console.log('REMOVING')
        const aNoteIdx = material.notes.all.findIndex((el) => {return el.id === id});
        material.notes.all.splice(aNoteIdx, 1);

        const pNoteIdx = material.notes.page.findIndex((el) => {return el.id === id});
        material.notes.page.splice(pNoteIdx, 1);
        console.log('REMOVED')

        callback(id);
        //self.$callNoteChangeListeners();
      }, 1000);
    },
    
    updateNote(note, callback) {
      const self = this;
      
      setTimeout(() => {
        callback({...note, time: 'just-now'});
        self.$callNoteChangeListeners();
      }, 1000);
    },

    addNote(note, callback){
      const self = this;

      setTimeout(() => {
        note.id = String(material.notes.all.length);
        note.time = 'just-now';
        material.notes.all.push(note);
        material.notes.page.push(note);
        
        callback(note);
        self.$callNoteChangeListeners();
      }, 1000);
    },

    downloadPageNotes() {
      console.log('DOWNLOAD PAGE NOTES');
    },

    downloadAllNotes() {
      console.log('DOWNLOAD ALL NOTES');
    },

    onPageNoteChange(callback) {
      onNoteChangeListeners.push(callback);
    },


    $callNoteChangeListeners() {
      console.log('CALLING NOTE CHANGE LISTENERS');
      
      onNoteChangeListeners.map(callback => callback([...material.notes.page]));
    }
  };
}