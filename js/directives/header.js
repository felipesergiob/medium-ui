angular.module('mediumApp').directive('customHeader', function() {
    return {
        restrict: 'E',
        template: `
            <header class="doca-flex doca-justify-between doca-items-center doca-py-4"
                    style="border-bottom: 1px solid #d9e1e8; position: fixed; top: 0; left: 0; width: 100%; background-color: #fff; z-index: 1000; height: 64px;">
                <div class="doca-flex doca-items-center">
                    <img src="assets/images/amigo.png" alt="Logo Amigo" class="doca-w-1/6 doca-ml-5" />
                    <div class="doca-form__field doca-ml-5">
                        <div class="doca-form-control__icon-container doca-form-control__icon-container--left">
                            <i class="doca-icon doca-icon__search"></i>
                            <input
                                class="doca-form-control doca-h-16 doca-text--large"
                                placeholder="Search"
                                ng-model="searchQuery" />
                        </div>
                    </div>
                </div>
                <div>       
                    <button class="doca-button doca-button--large doca-button--tertiary" ng-click="createPost()">
                        <i class="doca-icon doca-icon__pen-to-square doca-icon--extra-large"></i>
                        <p class="doca-text--extra-large">Write</p>
                    </button>       
                    <button class="doca-button doca-button--large doca-button--tertiary">
                        <i class="doca-icon doca-icon__bell doca-icon--extra-large"></i>
                    </button>       
                    <button class="doca-button doca-button--large doca-button--tertiary"
                            ng-if="!isLogged"
                            ng-click="openLoginRegisterModal()">
                        <i class="doca-icon doca-icon__right-to-bracket doca-icon--extra-large"></i>
                    </button>
                    <button class="doca-button doca-button--large doca-button--tertiary"  
                            ng-if="isLogged"
                            ng-click="openUserProfileModal()">
                        <i class="doca-icon doca-icon__circle-user doca-icon--extra-large"></i>
                    </button>
                </div>
            </header>
        `,
        scope: {
            searchQuery: '=',
            createPost: '&',
            openLoginRegisterModal: '&',
            openUserProfileModal: '&',
            isLogged: '='
        }
    };
});
