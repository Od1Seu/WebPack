
function createAnalytics(): object {
  let counter = 0;
  let is_destroyed: boolean = false;

  const listener_click = (): number => counter++;

  window.addEventListener('click', listener_click);

  return {
    getClicks(){
      if (is_destroyed){
        return  'Analytics was destroyed';
	  }
      return counter;
	},
	destroy(){
      window.removeEventListener('click', listener_click);
	  is_destroyed = true;

	}
  }
}

window['analytics'] = createAnalytics();
