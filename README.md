# EC2 ubuntu22 Nginx ssl 연습

### Aws EC2 인스턴스 생성
프리티어로 하나 만들고 만들때 생성된 pem키 ssh폴더에 pem폴더 하나 만들어서 넣어준다
config하나 만들어서 키관리할 수 있게 작성해준다.
pem파일 권한 수정하고
ssh 로 ec2로 원격접속 진행

ec2에 접속하면 port번호를 바꿔준다.
ect폴더는 window의 프로그램폴더, mac의 응용프로그램폴더처럼 설치한 프로그램들이 깔리는 폴더다.
ect/ssh/sshd_config 에서 port를 설정해준다.
설정안해주면 기본포트인 22번으로 받는데
그럼 해킹에 너무 취약해지기 때문에 다른걸로 바꿔줘야한다.

config 파일에서도 포트를 바꿔적어줘야한다. 근데 잘못되면 두번다시 인스턴스 접근을 못하게 될거니 해당 서버에서 나가면 안된다.
터미널 하나 새로파서 테스트 진행
당연히 안된다.
이제 aws에서 만든 인스턴스 안에 들어가서 보안규칙을 수정해줘야한다.
인바운드 아웃바운드가 있는데
인바운드는 이 서버 들어갈때 포트를 제한걸어버리는거고
아웃바운드는 이 서버 나갈때 포트 제한을 걸어버리는거다.

일단 http와 https 프로토폴이 사용하는 80번과 443번포트는 그대로 나두고
ssh의 포트를 바꿔줘야한다.
22번포트를 삭제하고 다른 수정한 포트로 바꿔준다. 

나갈때는 모든 포트로 나갈수 있어야하니 아웃바운드는 건드리지말고
이제 다시 ssh로 접근해보면 들어가진다.

### github에서 프로젝트 땡겨오기
github repository보면 ssh로 땡겨올 수 있다.
여기서 ssh 키를 만들고 Ec2에서 ssh 폴더 들어가서 위에서와 똑같이 해준다. 
pub키 값을 해당 repository의 setting의 배포키를 설정하는데 등록해주고 
clone 따오면 된다.

그 후에 
nvm을 설치하고
nvm으로 node를 install한다.
node를 install하면 npm도 설치되니
npm으로 yarn 과 pm2를 -g로 설치한다.

pm2 에코시스템 세팅을 다해놓은 프로젝트기 때문에
root 폴더들어가서 yarn install하고 yarn run pm2
이제 curl localhost:port 를 실행시켜서
프로젝트 잘 돌아가는지 확인한다
잘되면 그 다음 단계

### nginx 설치, dns 세팅
sudo로 패키지 매니저 a뭐시키 설치하고
그 패키지 매니저를 통해 관리자 권한으로 nginx 설치한다
그리고 ec2에서 제공해주는 dns로 들어가보면 nginx index 페이지가 보인다.
잘 연결 됬다는거다.
도메인 구입 후 세팅해준다.
그럼 이제 내가 구매한 도메인으로 들어가도 nginx index페이지가 보인다. 
아주 잘됬는거다.

### ssl인증서 발급, nginx 세팅
ssl 무료 인증서를 발급하자.
발급할때 위에 내가 구매한 도메인으로 인증서를 발급하고 
무료인증서는 3개월마다 갱신해야하니 자동으로 갱신시켜주는 프로그램 install 해서 세팅해주고 테트스까지 해준다.
ect/nginx/sites-av??? 폴더에 있는 default 파일을 수정해줘야한다.
수정할때는 관리자 권한으로 해줘야한다. 
server{} 블록을 2개 만들어주고 하나는 80번 포트, 하나는443포트를 세팅해준다.
80번으로 들어오면 443으로 리다이렉트 시켜주고
443에서는 아까 발급한 인증서를 세팅해주자.
그리고 locaiotn /{} 블록에서 localhost:port 를 프록시로 돌려줘야한다. 자세한 세팅은 찾아봐라
세팅을 다하면 sudo ningx -t 로 default 파일이 정상적으로 세팅됬는지 확인하자.
ok가 떨어지면 이제 nginx 를 재시작한다.
그럼 내가 구매한 도메인을 접속하면 https가 먹혀있는 페이지로 잘나오는것을 확인할 수 있다.

참고로 구매해서 사용중인 ssl 인증서가 있다면 scp 를 사용해서 A서버 -> 내컴퓨터 / 내컴퓨터 -> B서버
이런식으로 옮겨야한다. ssh 폴더에서 scp a-server:~/key ~/.ssh
파일위치/파일 옮길폴더위치 이런식으로 적어줘라
scp는 해당 파일을 copy하는거다.

### 추가 rds 세팅
rds는 관계형 database service의 줄임말이고
프리티어가 없다.
이것도 인스턴스 세팅해주고 인바운드 룰 세팅안하면 못들어가니 조심하자.
