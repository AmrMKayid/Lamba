### PROBLEMS IN IMAGE UPLOADING: 

* As a non-logged in user, I can easily upload files to the server!! (momken teb2a fixed zy el store, replace el isAuthenticated middleware, w unlink el file if not authenticated)
* You can upload infinite number of images that are not referenced.
* I can upload any sort of files (.json aw kda) 
* No size limit whatsoever

==============================================

## Problems :
The whole point is that services keep their state (thus their data, including the token).

### Admin profile : 
Will just add an extra routing in the profile component when the role doesn't match any.

### Missing: 
Child shouldn't see the post article button. 