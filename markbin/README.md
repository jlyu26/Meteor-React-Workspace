# MarkBin

A markdown workspace collaborator.

<img width="601" alt="markbin-list" src="https://user-images.githubusercontent.com/20265633/37188479-5ba91fde-231d-11e8-9c6c-261cfc5b38e9.PNG">

<img width="601" alt="markbin-editor" src="https://user-images.githubusercontent.com/20265633/37188483-5fc1cec2-231d-11e8-9ed5-faac0a2e37fd.PNG">

## Challenges

1. Users must be able to navigate to different 'pages'	(React Router)
2. Need a full authentication system	(Meteor Blaze)
3. The 'bins' collection requires a schema that can figure out who a bin belongs to, who has access to it via sharing, and the actual markdown text
4. Must be able to resolve whether a user has access to a given bin
5. Must be able to generate a list of all the bins a user should have access to for the list page

## Structure

<img width="454" alt="markbin-structure" src="https://user-images.githubusercontent.com/20265633/37133772-41562556-2263-11e8-893c-27e11f6966a0.PNG">