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
      setTimeout(() => {
        callback(id);
      }, 1000);
    },
    
    updateNote(note, callback) {
      setTimeout(() => {
        callback({...note, time: 'just-now'})
      }, 1000)
    },

    addNote(note, callback){
      setTimeout(() => {
        note.id = String(material.notes.all.length);
        note.time = 'just-now';
        material.notes.all.push(note);
        
        callback(note);
      }, 1000);
    },

    downloadPageNotes() {
      console.log('DOWNLOAD PAGE NOTES');
    },

    downloadAllNotes() {
      console.log('DOWNLOAD ALL NOTES');
    }
  }
}