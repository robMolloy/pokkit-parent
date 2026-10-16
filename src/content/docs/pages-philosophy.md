# Pages philosophy

Each page sets up the routing. It grabs the params, or anything similar from the URL, and passes them to a corresponding page content component of the same name. Page content takes props related to the URL and other global state.

If a page is very simple and just imports a single component, or there is almost no logic, there is no need for a page content component.
