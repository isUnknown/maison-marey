<?php

return function($site) {    
    return htmlspecialchars($site->children()->listed()->toJson(), ENT_QUOTES, 'UTF-8');
};