package com.ftq.service.impl;

import com.ftq.bo.Sanseqiu;
import com.ftq.bo.UserBo;
import com.ftq.dao.UserDao;
import com.ftq.service.UserSer;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class UserSerImpl implements UserSer {
    @Resource
    UserDao userDao;

    public String getName(String s){
        System.out.println(userDao);
      String t =  userDao.getName("1");
        return t;
    }
//计算近200期
    public List<Sanseqiu> getSanseqiu(String s){
        List<Sanseqiu> Sanseqiu  = userDao.getSanseqiu(s);

        return  Sanseqiu;
    }

}
