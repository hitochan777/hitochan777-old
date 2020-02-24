---
title: GraphQL nexus says interface object lacks resolve function
layout: blog
date: '2019-11-22T12:28:36.695Z'
draft: false
---
# Error description
I have an interface type called `Node` which contains ID field. 

```typescript
import { interfaceType } from "nexus";

export const Node = interfaceType({
  name: "Node",
  definition(t) {
    t.id("id", {
      description: "Unique identifier for the resource"
    });
    t.resolveType(() => null);
  }
});
```

It had been working perfectly ok till I suddenly got compilation error from typescript.
 
```console
[tsserver 2345] [E] Argument of type '[{ description: string; }]' is not assignable to parameter of type '[OutputScalarConfig<"Node", "id"> & { resolve: FieldResolver<"Node", "id">; }] | [FieldResolver<"Node", "id">]'.
  Type '[{ description: string; }]' is not assignable to type '[OutputScalarConfig<"Node", "id"> & { resolve: FieldResolver<"Node", "id">; }]'.
    Type '{ description: string; }' is not assignable to type 'OutputScalarConfig<"Node", "id"> & { resolve: FieldResolver<"Node", "id">; }'.
      Property 'resolve' is missing in type '{ description: string; }' but required in type '{ resolve: FieldResolver<"Node", "id">; }'.
```

So basically this error is telling me that resolver method is missing in the interface type. I had no idea why I started to get this error.  

The first thing I tried was to use `git bisect` command to find in which git commit it became broken.  
Basically it uses binary search algorithm to find the commit in which the command you specified (in my case typescript build command) fails, which means exit with code other than 0.   

# The Culprit
I skimmed through the changes in the commit then I noticed id field type of entity classes that are used as root objects in GraphQL resolvers changed from `number` to `number | null`. 
The reason why I change it to nullable is I wanted to express not-persisted entities with null id.  
These entities are then passed to repository classes to be persisted in DB or whatever.  
Okay so the field became nullable. 
By default, nexus assumes fields are not nullable and as you can see from the code above, id field is not nullable.  
But because GraphQL objects that implements this interface started to use entity classes that can have nullable id, there occurred a contradiction!  
Wow, Typescript is so clever...

# How to Fix
There are serveral ways to fix this error.

* Make id fields of entity classes non-nullable.
* Set `nullable: true` in id field of interface type definition.

In my case, I prefer the first option because for the second option because I have to handle null or undefined IDs when get GraphQL query results.
In my case, Ids can only be null when an entity is not persisted and the queried objects are constructed from persisted data so I know the id cannot be null when queried.

So Instead of using null for expressing not-persisted entities, I decided to use -1 or something.
