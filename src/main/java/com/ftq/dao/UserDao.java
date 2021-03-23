package com.ftq.dao;

import com.ftq.bo.Sanseqiu;
import com.ftq.bo.UserBo;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserDao {

    public String getName(String s);

    public List<Sanseqiu> getSanseqiu(String s);

}
