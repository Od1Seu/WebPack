function createAnalytics() {
  let counter = 0;
  let is_destroyed = false;

  const listener_click = () => counter++;

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

window.analytics = createAnalytics();
