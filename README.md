# IMPORTANT 
### Please drop any entries for the articles in the database as their controller has been updated, and it would give errors for older schemas


### PROBLEMS IN IMAGE UPLOADING: 

* As a non-logged in user, I can easily upload files to the server!! (momken teb2a fixed zy el store, replace el isAuthenticated middleware, w unlink el file if not authenticated)
* You can upload infinite number of images that are not referenced.
* I can upload any sort of files (.json aw kda) 
* No size limit whatsoever
