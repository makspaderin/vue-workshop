

const NUM_PAGES_PER_CHAPTER = 10;

let CUR_ID = 1;
let PAGE_ID = 1;

const getID = () => {
  return ''+CUR_ID++;
}

const createRootNode = (id, originalID) => {
  return {
    id: id ? id : getID(),
    title: 'Welcome',  
    type: 'navigation/menu',
    parent: null,
    navigation: true,
    children: []      
  };
}

const generatePages = (parent) => {
  let pages = [];
  for (let i = 0; i < NUM_PAGES_PER_CHAPTER; i++) {
    let pageNode = {
      id: getID(),
      parent,
      title: `Page ${i} for chapter ${parent.title}`,
      type: 'content-page',
      children: [],
      navigation: false
    }
    pages.push(pageNode);
  }
  return pages;
};

const generateChapters = (rootNode, titles) => {

  for (let i = 0; i < titles.length; i++) {
    let chapterNode = {
      id: getID(),  
      title: titles[i],
      type: 'navigation/menu',
      parent: rootNode,
      navigation: false
    };
    chapterNode.children = generatePages(chapterNode);
    rootNode.children.push(chapterNode);
  }
}

export const genMaterial = () => {

  const chapters = [
    'Johdanto: Ihminen',
    '1. Ihmisen solut',
    '2. Ihmisen ominaisuudet',
    '3. Ihmisen evoluutio',
    '4. Ihmislajin ominaisuudet',
    '5. Hormonit',
    '6. Hermosto',
    '7. Aistit',
    '8. Ruansulatus',
    '9. Veri',
    '10. Verenkierto',
    '11. Hengitys',
    '12. Luut ja lihakset',
    '13. Munuaiset',
    '14. Maksa',
    '15. Puolustus',
    '16. Sukupuoli',
    '17. Lisääntyminen',
    '18. Elämänkaari',
    '19. Kertaus - Anatomia'    
  ];

  // generate tree
  let rootNode = createRootNode();
  generateChapters(rootNode, chapters);

  return rootNode;
}

export const findNode = (rootNode, id) => {
  let stack = [];
  stack.push(rootNode);
  while(stack.length) {
    let node = stack.pop();
    if (node.id === id) {
      return node;
    }
    for (let i = node.children.length-1; i >= 0; i--) {
      stack.push(node.children[i]);
    }
  }
};

