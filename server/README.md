# README #

This README describes the Falcor routes available to clients

## Carousels ##

### How to retrieve number of available tabs ###

* Request: http://localhost:8004/pgws.json?paths=[["carousels","length"]]&method=get
* Response: {"jsonGraph":{"carousels":{"length":3}}}

### How to retrieve number of carousels for tabs ###

* Request: http://localhost:8004/pgws.json?paths=[["carousels",[0,1,2],"categories","length"]]&method=get
* Response: {"jsonGraph":{"carousels":{"0":{"categories":{"length":5}},"1":{"categories":{"length":3}},"2":{"categories":{"length":3}}}}}

### How to retrieve attributes for tabs ###

* Request: http://localhost:8004/pgws.json?paths=[["carousels",[0,1,2],"displayType"]]&method=get
* Response: {"jsonGraph":{"carousels":{"0":{"displayType":"On Now"},"1":{"displayType":"My Library"},"2":{"displayType":"Discover"}}}}

### How to retrieve number of items in carousels ###

* Request:
* Response: