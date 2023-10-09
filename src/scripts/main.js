'use strict';

const { body } = document;

/* first promise */
const createFirstPromise = () => {
  const scenario = (resolve, reject) => {
    document.body.addEventListener('click', () => {
      resolve('First promise was resolved');
    })

    setTimeout(() => {
      reject('First promise was rejected')
    }, 3000)
  }

  return new Promise(scenario);
}

const firstPromise = createFirstPromise();

firstPromise
  .then(result => {
    body.insertAdjacentHTML('beforeend', `
      <div class="success" data-qa="notification">${result}</div>
    `)
  })
  .catch(error => {
    const errorMessage = document.createElement('div');
    errorMessage.dataset.qa = 'notification';
    errorMessage.classList.add('warning');
    errorMessage.innerText = error;
    body.append(errorMessage);
  })

/* second promise */

const secondScenario = (resolve) => {
  document.addEventListener('click', () => {
    resolve("Second promise was resolved");
  })
  document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    resolve("Second promise was resolved");
  })
}

const secondPromise = new Promise(secondScenario);
secondPromise
  .then(result => {
    body.insertAdjacentHTML('beforeend', `
      <div class="success" data-qa="notification">${result}</div>
    `)
  })

/* third promise */

const createThirdPromise = (type) => {
  const scenario = (resolve) => {
    document.addEventListener(type, (event) => {
      if (type === 'contextmenu') {
        event.preventDefault();
      }
      resolve();
    })
  }

  return new Promise(scenario);
}

const thirdPromiseOne = createThirdPromise('click');
const thirdPromiseTwo = createThirdPromise('contextmenu');

Promise.all([thirdPromiseOne, thirdPromiseTwo])
  .then(() => {
    body.insertAdjacentHTML('beforeend', `
      <div class="success" data-qa="notification">Third promise was resolved </div>
    `)
  })
