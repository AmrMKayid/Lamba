

## Other components work:

* Accessing the profile images of the author, commenters and repliers 
* Accessing the about information of the author 



## C1 component independent : 

* Add image thumbnails to articles 
* Add images within an article 

## Shared :

#### Favorite items (resources/store_items/activites)
Each user would have a fav object:
  {
    activities: [IDs],
    resources: [IDs],
    items: [IDs]
  }
  
Then retrieve all in one backend point, sort by date for example, and render all in one page.

Deleting articles:
  * Delete from favorites
  
#### Articles approval (Pending admin response (msg = null)/ Pending user response (msg = SOMETHING) / Approved)
Editing articles:
  * Change flag approved.status => pending admin
  * Reset approved.message => ''

