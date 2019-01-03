BulbApp.controller("StartupCtrl", function ($scope) {



    $scope.v = "0.027";
    $scope.nm = "Glider release";

    $scope.startup = {};
    $scope.startup.title = "Demo BULB version: " + $scope.v;
    $scope.startup.prebody = "Użytkowniku!";
    $scope.startup.body = "W związku wejściem w życie z dnie 25 maja 2018r. Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016r., w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych powszechnie określane jako RODO), poniżej podstawowe informacje, w jaki sposób przetwarzamy Twoje dane osobowe oraz jakie masz związane z tym prawa. Administratorem Twoich danych osobowych jest Twój TA (Time Admin) oraz Twoi przełożeni, którzy są uprawnieni do przeglądania danych osobowych. Dane zawarte w systemie to minimalna wymagana ilość informacji (imie, nazwisko, GMID) + wszystkie niezbędne informacje związane z Twoim harmonogramem czasu pracy tak, aby system mógł‚ działać poprwanie. Masz prawo nie korzystać z tego systemu i swoim harmonogramem czasu pracy zarządzać w inny wybrany i uzgodniony z Twoim TA oraz przełożonym sposobie. System oraz ludzie zarządzający nim, jak i informacją zawartą w bazie danych BULB dokładają wszelkich starań, aby Twoje dane osobowe były bezpieczne. Twoje prawa: Pamiętaj, że masz prawo w każdym czasie cofnąć udzielonej zgodę. Nie będzie to miało negatywnych konsekwencji. Cofnięcie zgody pozostaje bez wpływu na dotychczasowe przetwarzanie, jeszcze na podstawie zgody. Jeżeli chcesz cofnać zgodę, edytuj swoje dane w profilu lub skontaktuj się z nami. Masz prawo żądać dostępu do swoich danych osobowych. Masz prawo sprostować swoje dane osobowe, a nawet je usunąć. Usunięcie danych, które są niezbędne do świadczenia usługi jest równoznaczne z usunięciem konta z serwisu."
    $scope.startup.version = "version: " + $scope.v + " - the glider";


    $scope.startup.agree = "Zgadzam się na przetwarzanie moich danych osobowych i przechodzę do aplikacji!";


    $scope.agreeAndGo = function () {
        // console.log("agreeAndGo");

        $("#loader1").hide();
        addTempClassToDisplayNone(false);
    }

});
